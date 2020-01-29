import { trackObjectHistory } from "./trackObjectHistory";

describe("trackObjectHistory", () => {
  it("should be initialized correctly", () => {
    const original = {
      test: "value",
      anotherValue: 123
    };

    const [tracked, history] = trackObjectHistory(original);

    // a proxied version of the object should be returned,
    // but this is impossible to prove (without attaching extra data),
    // so we'll just check that an equal but not referentially
    // equal object is returned
    expect(tracked).not.toBe(original);
    expect(tracked).toEqual(original);

    // should not have any history initially
    expect(history.length).toBe(0);
  });

  type Original = {
    test: string;
    anotherValue: number;
  };

  function expectHistoryUpdate(
    mutateTrackedObject: (tracked: Original) => void
  ) {
    const original: Original = {
      test: "value",
      anotherValue: 123
    };

    const [tracked, history] = trackObjectHistory({ ...original });

    mutateTrackedObject(tracked);

    expect(history).toContainEqual(original);
  }

  it("should handle setting a property on the object", () => {
    expectHistoryUpdate(tracked => {
      tracked.anotherValue = 111;

      // property is updated with the new value
      expect(tracked.anotherValue).toBe(111);
    });
  });

  it("should handle defining a new property on the object", () => {
    expectHistoryUpdate(tracked => {
      Object.defineProperty(tracked, "newProp", {
        value: "new value"
      });

      // new property exists with the given value
      expect(tracked["newProp"]).toBe("new value");
    });
  });

  it("should handle deleting a property", () => {
    expectHistoryUpdate(tracked => {
      delete tracked.test;

      // new property exists with the given value
      expect(tracked.test).toBeUndefined();
    });
  });
});
