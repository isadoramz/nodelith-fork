import { PlainFunction } from '@nodelith/utilities';
import { ControllerMethodMetadata } from './controller-method-metadata';

export type ControllerMethodDescriptor = TypedPropertyDescriptor<
  PlainFunction & { [ControllerMethodMetadata.METADATA_KEY]?: ControllerMethodMetadata }
>;
