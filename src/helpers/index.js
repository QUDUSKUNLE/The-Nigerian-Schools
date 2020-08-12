const schoolData = [
  'school_name',
  'school_address',
  'school_convention',
  'school_class',
  'school_section',
  'school_type',
  'school_contacts'
]

const updateSchool = (args) => {
  const keys = Object.keys(args.input);
  let updateSchoolData = {};
  keys.forEach(element => { 
    if (schoolData.includes(element)) {
      updateSchoolData[element] = args.input[element];
    }
  });
  return updateSchoolData;
}

module.exports = updateSchool;
