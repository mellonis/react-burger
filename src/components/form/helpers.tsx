import { TICons } from '@ya.praktikum/react-developer-burger-ui-components/dist/ui/icons';
import React, { ReactNode } from 'react';
import { Control, Controller } from 'react-hook-form';
import {
  Input,
  PasswordInput,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom';

import { AdditionalAction } from '../../types';

export const produceAdditionalActionReactNode: (
  value: AdditionalAction,
  index: number,
  array: AdditionalAction[]
) => ReactNode = ({ title, url, urlTitle }, index) => (
  <React.Fragment key={index}>
    {index > 0 ? <div className={'pt-4'} /> : null}
    <div>
      <span
        dangerouslySetInnerHTML={{
          __html: title,
        }}
      />
      &nbsp;
      <Link
        to={url}
        dangerouslySetInnerHTML={{
          __html: urlTitle,
        }}
      />
    </div>
  </React.Fragment>
);

export enum ComponentInputType {
  input = 'input',
  passwordInput = 'passwordInput',
}

interface InputDeclaration {
  componentType: ComponentInputType.input;
  icon?: keyof TICons;
  initialValue?: string;
  name: string;
  placeholder?: string;
  type?: React.ComponentProps<typeof Input>['type'];
}

interface PasswordInputDeclaration1 {
  componentType: ComponentInputType.passwordInput;
  initialValue?: string;
  name: string;
  placeholder?: string;
}

type InputDeclarations = InputDeclaration | PasswordInputDeclaration1;

export type { InputDeclarations as InputDeclaration };

export const produceInputReactNode: (
  value: InputDeclarations,
  index: number,
  array: InputDeclarations[]
) => ReactNode = function (this: Control, inputDeclaration, ix) {
  let component: ReactNode;

  switch (inputDeclaration.componentType) {
    case ComponentInputType.input: {
      const { icon, name, placeholder, type = 'text' } = inputDeclaration;

      component = (
        <Controller
          control={this}
          name={name as 'email' | 'name' | 'password'}
          render={({ field: { onChange, value } }) => (
            <Input
              icon={icon}
              onChange={onChange}
              placeholder={placeholder}
              type={type}
              value={value}
            />
          )}
        />
      );
      break;
    }
    case ComponentInputType.passwordInput: {
      const { name } = inputDeclaration;

      component = (
        <Controller
          control={this}
          name={name as 'email' | 'name' | 'password'}
          render={({ field: { onChange, value } }) => (
            <PasswordInput name={name} onChange={onChange} value={value} />
          )}
          // TODO: (mellonis) provide placeholder after @ya.praktikum/react-developer-burger-ui-components library is update
        />
      );
      break;
    }
  }

  return (
    <React.Fragment key={ix}>
      {ix > 0 ? <div className={'pt-6'} /> : null}
      {component}
    </React.Fragment>
  );
};
