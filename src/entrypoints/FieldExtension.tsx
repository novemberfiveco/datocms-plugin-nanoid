import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { Parameters } from './ConfigScreen';
import { v4 as uuidv4 } from 'uuid';

type Props = {
  ctx: RenderFieldExtensionCtx;
};

export default function FieldExtension({ ctx }: Props) {
  const params = ctx.plugin.attributes.parameters as Parameters;
  const hideField = !!params.hideField;
  // Get the current value
  const currentValue = ctx.formValues[ctx.fieldPath] as string;

  if (!currentValue) {
    ctx.setFieldValue(ctx.fieldPath, uuidv4());
  }

  if (hideField) {
    ctx.toggleField(ctx.fieldPath, !hideField);
    return null;
  } else {
    // Always disable the field
    ctx.disableField(ctx.fieldPath, true);

    return <Canvas ctx={ctx}>{currentValue}</Canvas>;
  }
}
