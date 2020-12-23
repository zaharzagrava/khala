const deepDiffMapper = (function () {
  return {
    VALUE_CREATED: "created",
    VALUE_UPDATED: "updated",
    VALUE_DELETED: "deleted",
    VALUE_UNCHANGED: "unchanged",
    map: function (obj1, obj2) {
      console.log("@objects");
      console.log({ obj1, obj2 });

      if (this.isValue(obj1) || this.isValue(obj2)) {
        return {
          type: this.compareValues(obj1, obj2),
          data: obj2,
        };
      }

      const diff = {};
      for (const key in obj1) {
        const value1 = obj1[key];
        const value2 = key !== undefined && obj2[key];

        console.log("@values");
        console.log({ value1, value2 });

        diff[key] = this.map(value1, value2);

        console.log("@diff");
        console.log(JSON.stringify(diff, undefined, 2));
      }

      for (const key in obj2) {
        if (diff[key] !== undefined) continue;

        const value2 = obj2[key];

        diff[key] = this.map(undefined, value2);
      }

      return diff;
    },

    compareValues: function (value1, value2) {
      if (value1 === value2) {
        return this.VALUE_UNCHANGED;
      }
      if (value1 === undefined) {
        return this.VALUE_CREATED;
      }
      if (value2 === undefined) {
        return this.VALUE_DELETED;
      }

      return this.VALUE_UPDATED;
    },
    isValue: function (x) {
      return (
        !Object.prototype.toString.call(x) === "[object Object]" &&
        !Object.prototype.toString.call(x) === "[object Array]"
      );
    },
  };
})();

var result = deepDiffMapper.map(
  {
    f: [
      1,
      {
        a: "same",
        b: [
          {
            a: "same",
          },
          {
            d: "delete",
          },
        ],
      },
    ],
  },
  {
    f: [
      {
        a: "same",
        b: [
          {
            a: "same",
          },
          {
            c: "create",
          },
        ],
      },
      1,
    ],
  }
);

console.log(JSON.stringify(result, null, 2));
