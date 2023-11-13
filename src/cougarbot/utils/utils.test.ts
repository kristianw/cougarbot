import { getNextDayOfWeek } from "../utils";

describe("Utils", () => {
  describe("getNextWednesdayDate", () => {
    it("test_returns_next_wednesday_date", () => {
      const nextWednesdayDate = getNextDayOfWeek(new Date(), 3);
      expect(nextWednesdayDate).toBeInstanceOf(Date);
    });

    it("test_returns_correct_date", () => {
      const nextWednesdayDate = getNextDayOfWeek(new Date(), 3);
      expect(nextWednesdayDate?.getDay()).toEqual(3);
    });
  });
});
