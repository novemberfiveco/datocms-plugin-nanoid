import { RenderConfigScreenCtx } from 'datocms-plugin-sdk';
import {
  Button,
  Canvas,
  FieldGroup,
  Form,
  SwitchField,
  TextField,
} from 'datocms-react-ui';
import { Controller, useForm } from 'react-hook-form';

type Props = {
  ctx: RenderConfigScreenCtx;
};

export type Parameters = {
  apiKey: string;
  hideField: boolean;
};

const getDefaultState = (params: Partial<Parameters>): Parameters => ({
  apiKey: params.apiKey || '',
  hideField: params.hideField === undefined ? true : params.hideField,
});

export default function ConfigScreen({ ctx }: Props) {
  const parameters = ctx.plugin.attributes.parameters as Parameters;
  const { handleSubmit, control } = useForm<Parameters>({
    defaultValues: getDefaultState(parameters),
  });
  const savePluginSettings = async (values: Parameters) => {
    await ctx.updatePluginParameters(values);
    ctx.notice('Settings updated successfully!');
  };

  return (
    <Canvas ctx={ctx}>
      <Form onSubmit={handleSubmit(savePluginSettings)}>
        <FieldGroup>
          <Controller
            control={control}
            name="apiKey"
            rules={{ required: 'DatoCMS api key is required' }}
            render={({ field: { ref: inputRef, ...field }, fieldState }) => {
              return (
                <TextField
                  {...field}
                  required
                  placeholder="nanoid"
                  error={fieldState.error?.message}
                  id="apiKey"
                  label="DatoCMS field api_key"
                  hint="The name of the api key to use for nanoid"
                />
              );
            }}
          />
        </FieldGroup>
        <FieldGroup>
          <Controller
            control={control}
            name="hideField"
            render={({ field: { ref: inputRef, ...field }, fieldState }) => {
              return (
                <SwitchField
                  {...field}
                  required
                  error={fieldState.error?.message}
                  id="hideField"
                  label="Hide field"
                  hint="Enabling this will hide the auto generated field"
                />
              );
            }}
          />
        </FieldGroup>
        <Button buttonSize="l" buttonType="primary" type="submit">
          Save settings
        </Button>
      </Form>
    </Canvas>
  );
}
