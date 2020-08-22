/*-------------------------------------------------------------------------
 * This source code is confidential proprietary information which is
 * copyright (c) 2018, 2019 TrueBlocks, LLC (http://trueblocks.io)
 * All Rights Reserved
 *------------------------------------------------------------------------*/
import React, { Fragment } from 'react';
import { useForm, ErrorMessage } from 'react-hook-form';
import { DevTool } from 'react-hook-form-devtools';

import { Modal } from 'components/Modal/Modal';

import './Dialog.css';
import { handleClick } from 'components/utils';
import { typeToConstraints } from 'modules/string_validation';

//-------------------------------------------------------------------------
export const Dialog = ({ showing, header, handler, object, columns }) => {
  const { register, control, handleSubmit, errors } = useForm();

  if (!showing) return <Fragment></Fragment>;

  const onSubmit = (data) => {
    console.log(data);
    handler({ type: 'edit', payload: data });
  };

  // Prepare click listeners
  // Here we "save" actionType for later use and return a new function that will take event as
  // a parameter and call `handleClick`
  const handleButtonClick = (actionType) => (e) => handleClick(e, handler, { type: actionType });
  // This one will call two functions. We don't need to return a new function and remember actionType,
  // because it will be used with submit button only - so we can just set `actionType` to `okay`.
  const handleSubmitClick = (e) => {
    e.persist();
    handleSubmit((data) => {
      onSubmit({
        ...data,
        id: data.address,
        is_custom: object.is_custom,
      });
      handleButtonClick('okay')(e);
    })();
  };

  // Buttons that we will use instead of the default ones
  const buttons = (
    <Fragment>
      <button type="reset" onClick={handleButtonClick('cancel')}>
        Cancel
      </button>
      <button type="submit" className="selected" onClick={handleSubmitClick}>
        Okay
      </button>
    </Fragment>
  );

  return (
    <Modal showing={true} handler={handler} buttons={buttons} header={header}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {columnsToInputs({ columns, defaultValues: object, register, errors })}
      </form>
      <DevTool control={control} />
    </Modal>
  );
};

//-------------------------------------------------------------------------
export const DialogRow = ({ name, selector, children }) => {
  return (
    <label key={selector}>
      <span>{name}</span>
      <div>{children}</div>
    </label>
  );
};

//-------------------------------------------------------------------------
function columnsToInputs({ columns, defaultValues, register, errors }) {
  let cnt = 0;
  return columns
    .filter(({ editable }) => editable)
    .map((column, index) => {
      const { selector, name, type } = column;
      if (selector === 'id') return null;
      const constraints = typeToConstraints.get(selector) || {};
      cnt++;
      return (
        <DialogRow key={selector} name={name} selector={selector}>
          <input
            name={selector}
            tabindex={index + 1}
            placeholder={' <' + type + '>'}
            focus={cnt === 1}
            defaultValue={defaultValues[selector]}
            className="editable_input"
            ref={register({ ...constraints })}
          />
          <ErrorMessage errors={errors} name={selector} />
        </DialogRow>
      );
    });
}
