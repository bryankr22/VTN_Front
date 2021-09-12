function parseLocaleNumber(stringNumber, locale) {
  var thousandSeparator = locale.format(11111).replace(/\p{Number}/gu, "");
  var decimalSeparator = locale.format(1.1).replace(/\p{Number}/gu, "");

  return (
    stringNumber
      .replace(new RegExp("\\" + thousandSeparator, "g"), "")
      .replace(new RegExp("\\" + decimalSeparator), ".") * 1
  );
}

export const toCurrency = (e) => {
  let dollarUSLocale = Intl.NumberFormat("es-ES");
  const value = parseLocaleNumber(e.target.value, dollarUSLocale);
  let valueFormat = dollarUSLocale.format(value);

  if (valueFormat === "NaN") {
    const chars = e.target.value.split("");
    e.target.value = chars.slice(0, chars.length - 1);
    return e.target.value;
  }

  e.target.value = valueFormat;
  return valueFormat
};
