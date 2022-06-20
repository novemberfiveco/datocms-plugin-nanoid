import { RenderFieldExtensionCtx } from 'datocms-plugin-sdk';
import { Canvas } from 'datocms-react-ui';
import { Parameters } from './ConfigScreen';
import { nanoid } from 'nanoid';
import get from 'lodash.get';

import s from './styles.module.css';
import { useLayoutEffect } from 'react';

type Props = {
  ctx: RenderFieldExtensionCtx;
};

export default function FieldExtension({ ctx }: Props) {
  const params = ctx.plugin.attributes.parameters as Parameters;
  const hideField = !!params.hideField;
  const currentValue = get(ctx.formValues, ctx.fieldPath) as string;
  // Destructure so we don't generate endless loops
  const { setFieldValue, toggleField, fieldPath } = ctx;

  // Set the current value if we didn't have a value yet
  useLayoutEffect(() => {
    if (!currentValue) {
      setFieldValue(fieldPath, nanoid());
    }
    toggleField(fieldPath, !hideField);
  }, [setFieldValue, fieldPath, currentValue, toggleField, hideField]);

  if (hideField) {
    return null;
  } else {
    // Always disable the field
    ctx.disableField(ctx.fieldPath, true);

    return (
      <Canvas ctx={ctx}>
        <div className={s.root}>
          {currentValue}

          <button
            type="button"
            className={s.link}
            onClick={() => ctx.setFieldValue(ctx.fieldPath, nanoid())}
          >
            Regenerate
          </button>
        </div>
      </Canvas>
    );
  }
}
