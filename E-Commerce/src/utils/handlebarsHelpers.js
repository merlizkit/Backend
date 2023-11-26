function hbsHelpers(hbs) {
    return hbs.create({
      helpers: {
        compare: function (v1, comparator, v2) {
            if (eval(`'`+v1+`'` + comparator + `'`+v2+`'`)) {
              return true
            } else {
              return false
            }
          },
      }
    });
  }
  
export default hbsHelpers;