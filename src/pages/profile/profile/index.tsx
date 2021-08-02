import React, { useMemo } from 'react';
import {
  ComponentInputType,
  Form,
  InputDeclaration,
} from '../../../components/form';
import { lexemes } from '../../../consts';
import { useAppSelector } from '../../../services/store';

const inputDeclarations: Readonly<InputDeclaration>[] = [
  {
    componentType: ComponentInputType.input,
    icon: 'EditIcon',
    name: 'name',
    placeholder: lexemes.forms.__common__.name,
    type: 'text',
  },
  {
    componentType: ComponentInputType.input,
    icon: 'EditIcon',
    name: 'email',
    placeholder: lexemes.forms.profile.email,
    type: 'email',
  },
  {
    componentType: ComponentInputType.input,
    icon: 'EditIcon',
    name: 'password',
    placeholder: lexemes.forms.__common__.password,
    type: 'password',
  },
];

const Profile = () => {
  const { user } = useAppSelector((state) => state.user);

  const actualInputDeclarations = useMemo(() => {
    if (!user) {
      return inputDeclarations;
    }

    return inputDeclarations.map((inputDeclaration) => {
      const inputDeclarationCopy: InputDeclaration = {
        ...inputDeclaration,
      };

      if (Object.prototype.hasOwnProperty.call(user, inputDeclaration.name)) {
        inputDeclarationCopy.initialValue =
          user[inputDeclaration.name as keyof typeof user];
      }

      return inputDeclarationCopy;
    });
  }, [user]);

  return (
    <div>
      <Form
        inputDeclarations={actualInputDeclarations}
        isButtonHiddenOnNotModifiedForm={true}
        buttonTitle={lexemes.forms.profile.doEdit}
        onSubmit={(formData) => {
          console.log(formData);
        }}
        resetButtonTitle={lexemes.forms.__common__.resetForm}
      />
    </div>
  );
};

export { Profile };
