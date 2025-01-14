import React, { ChangeEvent } from 'react';
import { Form, Field, FieldSet, Input } from '@grafana/ui';
import { DataSourcePluginOptionsEditorProps } from '@grafana/data';
import { MqttDataSourceOptions, MqttSecureJsonData } from './types';
import { handlerFactory } from './handleEvent';

interface Props extends DataSourcePluginOptionsEditorProps<MqttDataSourceOptions> {}

export const ConfigEditor = (props: Props) => {
  const {
    onOptionsChange,
    options,
    options: { jsonData, secureJsonData },
  } = props;
  const { host, port, username } = jsonData;
  const { password } = (secureJsonData ?? {}) as MqttSecureJsonData;
  const handleChange = handlerFactory(options, onOptionsChange);

  return (
    <Form onSubmit={() => {}}>
      {() => (
        <>
          <FieldSet label="Connection">
            <Field label="Host">
              <Input
                name="host"
                required
                value={host}
                css=""
                autoComplete="off"
                onChange={handleChange('jsonData.host')}
              />
            </Field>
            <Field label="Port">
              <Input
                type="number"
                name="port"
                required
                value={port}
                css=""
                autoComplete="off"
                onChange={handleChange('jsonData.port', Number)}
              />
            </Field>
          </FieldSet>

          <FieldSet label="Authentication">
            <Field label="Username">
              <Input
                name="username"
                value={username}
                css=""
                autoComplete="off"
                onChange={handleChange('jsonData.username')}
              />
            </Field>
            <Field label="Password">
              <Input
                type="password"
                name="password"
                css=""
                autoComplete="off"
                placeholder="************************"
                value={password}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  handleChange('secureJsonData.password')(event);
                  handleChange('secureJsonFields.password', Boolean)(event);
                }}
              />
            </Field>
          </FieldSet>
        </>
      )}
    </Form>
  );
};
