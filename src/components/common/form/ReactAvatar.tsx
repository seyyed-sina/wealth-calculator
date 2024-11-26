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

import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetFooter,
  SheetProps,
  SubmitButton,
} from '@components';

type Props = SheetProps & {
  src: string | null;
  onCrop?: (form: Blob) => void;
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

    const handleCrop = () => {
      const canvas = cropperRef?.current?.getCanvas();
      if (canvas) {
        updateState('saving', true);
        canvas.toBlob((blob) => {
          if (blob) {
            updateState('saving', false);
            onClose();
            onCrop?.(blob);
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
              className="mr-auto"
              isSubmitting={state.saving}
              // onClick={handleCrop}
            />
          </BottomSheetFooter>
        </form>
      </BottomSheet>
    );
  },
);

ReactAvatar.displayName = 'ReactAvatar';
