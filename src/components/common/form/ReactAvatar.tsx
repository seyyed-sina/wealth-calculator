'use client';;
import { FC, memo, useRef, useState } from 'react';

import {
  CropperRef,
  Cropper,
  CropperPreview,
  CropperState,
  CropperImage,
  CropperTransitions,
  ImageRestriction,
  CircleStencil,
} from 'react-advanced-cropper';
import { toast } from 'sonner';

import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetFooter,
  SheetProps,
  SubmitButton,
} from '@components';
import { apiEndpoints } from '@constants';
import { LocalResponse } from '@types';
import { getErrorMessage } from '@utils';

type Props = SheetProps & {
  src: string | null;
  onCrop?: (imageUrl: string) => void;
};

export const ReactAvatar: FC<Props> = memo(
  ({ isOpen, onClose, src, onCrop }) => {
    const cropperRef = useRef<CropperRef | null>(null);
    const [state, setState] = useState<{
      state: CropperState | null;
      image: CropperImage | null;
      transitions: CropperTransitions | null;
      loading?: boolean;
      loaded?: boolean;
      saving: boolean;
    }>({
      state: null,
      image: null,
      transitions: null,
      loading: false,
      loaded: false,
      saving: false,
    });

    const updateState = (name: string, value: unknown) => {
      setState((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const onUpdate = (cropper: CropperRef) => {
      setState((prev) => ({
        ...prev,
        state: cropper.getState(),
        image: cropper.getImage(),
        transitions: cropper.getTransitions(),
        loaded: cropper.isLoaded(),
        loading: cropper.isLoading(),
      }));
    };

    const uploadImageRequest = async (formData: FormData) => {
      const apiUrl =
        apiEndpoints.LOCAL_BASE_URL + apiEndpoints.LOCAL_UPLOAD_IMAGE;
      const res = await fetch(apiUrl, {
        body: formData,
        method: 'POST',
      });

      const { data, error } = (await res.json()) as LocalResponse<string>;
      return { data, error };
    };

    const handleCrop = () => {
      const canvas = cropperRef?.current?.getCanvas();
      if (canvas) {
        updateState('saving', true);
        const form = new FormData();
        canvas.toBlob(async (blob) => {
          try {
            if (blob) {
              form.append('profile_image', blob);
              const { data, error } = await uploadImageRequest(form);
              if (error) {
                toast.error(`خطا در آپلود عکس ${getErrorMessage(error)}`);
                return;
              }
              onCrop?.(data);
              onClose();
            }
          } catch (error) {
            toast.error(`خطا در آپلود عکس ${getErrorMessage(error)}`);
          } finally {
            updateState('saving', false);
          }
        });
      }
    };

    return (
      <BottomSheet isOpen={isOpen} onClose={onClose} title="تغییر عکس پروفایل">
        <form onSubmit={handleCrop}>
          <BottomSheetBody className="flex items-center justify-center h-96">
            <Cropper
              ref={cropperRef}
              src={src}
              stencilComponent={CircleStencil}
              stencilProps={{
                grid: true,
                aspectRatio: 1,
              }}
              className="size-full"
              imageRestriction={ImageRestriction.fitArea}
              onUpdate={onUpdate}
            />
          </BottomSheetBody>
          <BottomSheetFooter className="gap-4 justify-between">
            <CropperPreview className="rounded-full size-16" {...state} />
            <SubmitButton
              type="button"
              label="تایید و ذخیره"
              isSubmitting={state.saving}
              className="mr-auto relative"
              onClick={handleCrop}
            />
          </BottomSheetFooter>
        </form>
      </BottomSheet>
    );
  },
);

ReactAvatar.displayName = 'ReactAvatar';
