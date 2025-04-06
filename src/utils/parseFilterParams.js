const parseisFavourite = (isFavourite) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;
  const isBool = typeof JSON.parse(isString) === 'boolean';
  if (!isBool) return;
  return JSON.parse(isFavourite);
};

const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';
  if (!isString) return;

 const isContactType = (contactType) =>
   ['work', 'home', 'personal'].includes(contactType);

 if (isContactType(contactType)) return contactType;
};

export const parseFilterParams = (query) => {
  const { category, name } = query;

  const parsedisCategory = parseisFavourite(category);
 const parsedName = parseContactType(name);
  return {
    category: parsedisCategory,
    name: parsedName,
  };
};
