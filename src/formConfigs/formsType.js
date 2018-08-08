import t from "tcomb-form";

export const basicForm = t.struct({
  name: t.String,
  description: t.maybe(t.String),
  deviceResourceType: t.maybe(t.String),
  defaultValue: t.maybe(t.String),
  dataType: t.maybe(t.enums.of('STRING OBJECT')),
  format: t.maybe(t.enums.of('NONE NUMBER BOOLEAN DATE-TIME CDATA URI'))
});

export const noneForm = basicForm.extend({
  enumerations: t.maybe(t.String)
});

export const numberForm = basicForm.extend({
  rangeMin: t.Number,
  rangeMax: t.Number,
  unitOfMeasurement: t.String,
  precision: t.Number,
  accuracy: t.Number,
});
