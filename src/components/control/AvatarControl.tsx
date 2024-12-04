'use client';
import {
  memo,
  useRef,
  useState,
  ChangeEvent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

import { Controller, ErrorOption, useFormContext } from 'react-hook-form';
import { toast } from 'sonner';

import { Button, FormValidation, LucidIcon, ReactAvatar } from '@components';
import { useDebouncedCallback, useToggle } from '@hooks';
import { clx, formatFileSize, getErrorMessage } from '@utils';

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
const MAX_FILE_SIZE = 1 * 1024 * 1024; // 1 MB
export const AvatarControl = memo(
  ({
    name,
    error,
    isDisabled = false,
    className,
    defaultValue,
    placeholder,
    onChange,
    onDelete,
  }: Props) => {
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
        reader.readAsDataURL(file);
      },
      [toggleCrop],
    );

    const uploadImage = useCallback(
      (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];

        try {
          if (!file) {
            resetInput();
            throw new Error('لطفا فایلی برای آپلود انتخاب کنید');
          }
          if (file.size >= MAX_FILE_SIZE) {
            throw new Error(
              `حجم فایل نباید بیشتر از ${formatFileSize(MAX_FILE_SIZE)} باشد`,
            );
          }

          if (
            !['image/png', 'image/jpeg', 'image/jpg', 'image/gif'].includes(
              file.type,
            )
          ) {
            throw new Error('فایل انتخاب شده باید عکس باشد');
          }

          handlePreview(file);
        } catch (error) {
          toast.error(getErrorMessage(error) || 'آپلود عکس ناموفق بود');
        } finally {
          resetInput();
        }
      },
      [handlePreview],
    );

    const debounceUploadImage = useDebouncedCallback(
      uploadImage,
      DEBOUNCE_UPLOAD_DELAY,
    );

    const onCropImage = useCallback(
      (preview: string, onChangeCallback: (...event: any[]) => void) => {
        if (preview) {
          console.log('preview: ', preview);
          setCroppedImage(preview);
          onChange?.(preview);
          onChangeCallback?.(preview);
        }
      },
      [onChange],
    );

    useEffect(() => {
      setSelectedImage(getValues(name));
      return () => {
        setSelectedImage(null);
        setCroppedImage(null);
      };
    }, [getValues, name]);

    const avatarContainerClass = useMemo(
      () => (imagePreview: string) =>
        clx(
          'flex items-center justify-center size-30 rounded-full',
          !imagePreview &&
            'border border-solid border-gray-100 bg-gray-50 text-gray-300',
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
        render={({ field: { onChange, value } }) => {
          const imagePreview = croppedImage ?? value;
          console.log('imagePreview: ', imagePreview);
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
                  className={avatarContainerClass(imagePreview)}
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
                      <LucidIcon name="upload" className="size-8" />
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-center flex-col gap-1 leading-5 text-xs mt-3">
                  <span className="text-gray-300">
                    حداکثر حجم مجاز تصویر {formatFileSize(MAX_FILE_SIZE)} می
                    باشد
                  </span>
                  <span className="text-gray-300">
                    فرمت های تصویر مجاز: jpg, jpeg, png, gif
                  </span>
                </div>
                <div className={commonClasses.buttonGroup}>
                  <Button
                    size="sm"
                    variant="primary"
                    disabled={isDisabled}
                    label="آپلود عکس"
                    onClick={triggerInput}
                  />
                  {defaultValue && (
                    <Button
                      size="sm"
                      variant="red"
                      label="حذف"
                      onClick={onDelete}
                    />
                  )}
                </div>
                {error?.message && <FormValidation error={error.message} />}
              </div>
              <ReactAvatar
                isOpen={openCrop}
                src={selectedImage}
                onClose={toggleCrop}
                onCrop={(preview) => onCropImage(preview, onChange)}
              />
            </>
          );
        }}
      />
    );
  },
);

AvatarControl.displayName = 'AvatarControl';
