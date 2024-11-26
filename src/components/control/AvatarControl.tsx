import {
  memo,
  useRef,
  useState,
  FC,
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import {
  Controller,
  ControllerRenderProps,
  ErrorOption,
  FieldValues,
  useFormContext,
} from 'react-hook-form';
import { toast } from 'sonner';

import { Button, FormValidation, LucidIcon, ReactAvatar } from '@components';
import { useDebouncedCallback, useToggle } from '@hooks';
import { clx, formatFileSize } from '@utils';

interface Props {
  name: string;
  error?: ErrorOption;
  className?: string;
  defaultValue?: string;
  placeholder?: string;
  isDisabled?: boolean;
  onChange?: (value: string) => void;
  onDelete?: () => void;
}

const DEBOUNCE_UPLOAD_DELAY = 300;
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
export const AvatarControl: FC<Props> = memo(
  ({
    name,
    error,
    isDisabled = false,
    className,
    defaultValue,
    placeholder,
    onChange,
    onDelete,
  }) => {
    const [openCrop, toggleCrop] = useToggle();
    const { control, getValues } = useFormContext();
    const [croppedImage, setCroppedImage] = useState<string | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const imageFileInput = useRef<HTMLInputElement>(null);

    const triggerInput = () => {
      if (isDisabled) return;
      imageFileInput.current?.click();
    };

    const resetInput = () => {
      if (imageFileInput.current) {
        imageFileInput.current.value = '';
      }
    };

    const handlePreview = useCallback(
      (file: File) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setSelectedImage(reader.result as string);
          toggleCrop();
        };
        reader.onerror = () => {
          toast.error('آپلود عکس ناموفق بود');
        };
        try {
          reader.readAsDataURL(file);
        } catch {
          toast.error('آپلود عکس ناموفق بود');
        }
      },
      [toggleCrop],
    );

    const uploadImage = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        if (!file) {
          resetInput();
          return;
        }

        try {
          if (file.size >= MAX_FILE_SIZE) {
            toast.error(
              `حجم فایل نباید بیشتر از ${formatFileSize(MAX_FILE_SIZE)} باشد`,
            );
            return;
          }

          if (
            !['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(
              file.type,
            )
          ) {
            toast.error('فایل انتخاب شده باید عکس باشد');
            return;
          }

          handlePreview(file);
          toggleCrop();
        } finally {
          resetInput();
        }
      },
      [handlePreview, toggleCrop],
    );

    const debounceUploadImage = useDebouncedCallback(
      uploadImage,
      DEBOUNCE_UPLOAD_DELAY,
    );

    const onCropImage = (
      preview: Blob,
      field: ControllerRenderProps<FieldValues, string>,
    ) => {
      const objectURL = URL.createObjectURL(preview);
      setCroppedImage(objectURL);
      field.onChange?.(preview);
      onChange?.(objectURL);
    };

    useEffect(() => {
      setSelectedImage(getValues(name));
      return () => {
        setSelectedImage(null);
        setCroppedImage(null);
      };
    }, [getValues, name]);

    const avatarContainer = useMemo(
      () => (imagePreview: string) =>
        clx(
          'flex items-center justify-center size-34 rounded-full',
          !imagePreview &&
            'border border-gray-150 bg-gray-100 dark:bg-gray-700 dark:border-gray-300 text-gray-200',
        ),
      [],
    );

    const commonClasses = useMemo(
      () => ({
        container:
          'flex items-center justify-center text-center mx-auto flex flex-col',
        buttonGroup: 'flex items-center justify-center gap-4 mt-4',
      }),
      [],
    );

    return (
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        render={({ field }) => {
          const imagePreview = croppedImage ?? field.value;
          return (
            <>
              <input
                ref={imageFileInput}
                type="file"
                accept="image/png, image/gif, image/jpeg, image/jpg"
                className="hidden"
                onChange={debounceUploadImage}
              />
              <div className={clx(commonClasses.container, className)}>
                <div
                  role="button"
                  tabIndex={-1}
                  className={avatarContainer(imagePreview)}
                  aria-label={placeholder ?? 'آپلود عکس'}
                  onKeyDown={triggerInput}
                  onClick={triggerInput}>
                  {imagePreview && (
                    <div className="group size-full rounded-full relative">
                      <img
                        src={imagePreview}
                        className="object-cover bg-primary/20 size-full rounded-full"
                        alt="Preview"
                      />
                      <div className="absolute transition-all opacity-0 group-hover:opacity-100 inset-2 group-hover:bg-primary/50 flex items-center justify-center rounded-full">
                        <LucidIcon
                          name="upload"
                          className="size-8 text-white"
                        />
                      </div>
                    </div>
                  )}
                  {!imagePreview && (
                    <div className="flex flex-col items-center justify-center text-center gap-2">
                      <LucidIcon name="upload" className="size-10" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center flex-col gap-1 leading-5 text-xs mt-3">
                  <span className="text-gray-200">
                    حداکثر حجم مجاز تصویر {MAX_FILE_SIZE} می باشد
                  </span>
                  <span className="text-gray-200">
                    فرمت های تصویر مجاز: jpg, jpeg, png, gif
                  </span>
                </div>
                <div className={commonClasses.buttonGroup}>
                  <Button
                    size="small"
                    variant="primary"
                    disabled={isDisabled}
                    label="آپلود عکس"
                    onClick={triggerInput}
                  />
                  {typeof field.value === 'string' && (
                    <Button
                      size="small"
                      label="حذف"
                      className="bg-red/20 text-red"
                      onClick={onDelete}
                    />
                  )}
                </div>
                {error?.message && <FormValidation error={error.message} />}
              </div>
              <ReactAvatar
                isOpen={openCrop}
                onClose={toggleCrop}
                src={selectedImage}
                onCrop={(preview) => onCropImage(preview, field)}
              />
            </>
          );
        }}
      />
    );
  },
);

AvatarControl.displayName = 'AvatarControl';
