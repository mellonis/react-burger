import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import cs from 'classnames';
import { Ingredient_t } from '../../types';
import { lexemes } from '../../consts';

import style from './style.module.css';

const IngredientDetails = ({
  className,
  ingredient: { calories, carbohydrates, fat, image, name: title, proteins },
}: {
  className?: string;
  ingredient: Ingredient_t;
}) => {
  const nutritionalValues = useMemo(() => {
    return {
      calories,
      carbohydrates,
      fat,
      proteins,
    };
  }, [calories, carbohydrates, fat, proteins]);

  return (
    <div className={cs(style['ingredient-details'], 'mb-5', className)}>
      <div
        className={cs(
          style['ingredient-details__picture-wrapper'],
          'pl-5 pr-5'
        )}
      >
        <img
          alt={title}
          className={style['ingredient-details__picture']}
          src={image}
        />
      </div>
      <div className={'pt-4'} />
      <div
        className={cs(
          style['ingredient-details__title'],
          'text text_type_main-medium'
        )}
      >
        {title}
      </div>
      <div className={'pt-8'} />
      <div
        className={cs(
          style['ingredient-details__nutritional-values'],
          'text_color_inactive'
        )}
      >
        {Object.entries(nutritionalValues).map(([key, value], ix, list) => (
          <React.Fragment key={key}>
            <div className={style['ingredient-details__nutritional-value']}>
              <div
                className={style['ingredient-details__nutritional-value-title']}
              >
                {(lexemes as any)[key]}
              </div>
              <div
                className={cs(
                  style['ingredient-details__nutritional-value-value'],
                  'text text_type_digits-default pt-2'
                )}
              >
                {value}
              </div>
            </div>
            {ix + 1 < list.length ? <div className={'pl-5'} /> : null}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  className: PropTypes.string,
  ingredient: PropTypes.object.isRequired,
};

export default IngredientDetails;
