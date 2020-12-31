// +
function difference(obj1, obj2) {
  const diff = {};
  for (const key in obj1) {
    const value1 = obj1[key];
    const value2 = obj2[key] === undefined ? null : obj2[key];

    if (isConcept(value1) || isConcept(value2)) {
      diff[key] = {
        type: isEqual(value1, value2),
        data: value2
      };
    } else {
      diff[key] = difference(value1, value2);
    }
  }

  for (const key in obj2) {
    if (diff[key] !== undefined) continue;

    diff[key] = {
      type: isEqual(null, obj2[key]),
      data: obj2[key]
    };
  }

  return diff;
}

// +
function isConcept(data) {
  return data === null || Object.prototype.toString.call(data) !== '[object Object]';
}

function isEqual(primitive0, primitive1) {
  if (primitive0 === primitive1) {
    return 'unchanged';
  }
  if (primitive0 === null) {
    return 'created';
  }
  if (primitive1 === null) {
    return 'deleted';
  }

  return 'updated';
}

var result = difference(
  {
    f: {
      1: null,
      2: {
        a: 'same',
        b: {
          0: {
            a: 'same'
          },
          1: {
            d: 'delete'
          }
        }
      }
    }
  },
  {
    g: {
      a: 'new'
    },
    f: {
      1: null,
      2: {
        a: 'same',
        b: {
          0: {
            a: 'changed'
          },
          1: {
            d: 'delete'
          }
        }
      }
    }
  }
);

console.log(JSON.stringify(result, null, 2));
