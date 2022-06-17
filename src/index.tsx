import { connect, Field, FieldIntentCtx } from 'datocms-plugin-sdk';
import { render } from './utils/render';
import ConfigScreen, { Parameters } from './entrypoints/ConfigScreen';
import 'datocms-react-ui/styles.css';
import FieldExtension from './entrypoints/FieldExtension';

connect({
  renderConfigScreen(ctx) {
    return render(<ConfigScreen ctx={ctx} />);
  },
  overrideFieldExtensions(field: Field, { plugin }: FieldIntentCtx) {
    const params = plugin.attributes.parameters as Parameters;

    if (!('apiKey' in params)) {
      return;
    }

    if (!params.apiKey) {
      return;
    }

    if (
      field.attributes.field_type === 'string' &&
      field.attributes.api_key === params.apiKey
    ) {
      return {
        editor: {
          id: 'stableUuid',
        },
      };
    }
  },
  renderFieldExtension(_fieldExtensionId, ctx) {
    render(<FieldExtension ctx={ctx} />);
  },
});
