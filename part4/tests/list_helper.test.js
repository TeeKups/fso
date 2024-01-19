const listHelper = require('../utils/list_helper');

describe('List helper tests', () => {
    test('total likes returns sum of likes in given blogs', () => {
        // GIVEN
        const test_cases = [
            {
                expected: 10,
                blogs: [
                    { likes: 1, },
                    { likes: 2, },
                    { likes: 3, },
                    { likes: 4, },
                ]
            }, {
                expected: 3,
                blogs: [
                    { likes: 3 }
                ]
            }, {
                expected: 0,
                blogs: [ ]
            }
        ];

        for (const test_case of test_cases) {
            // WHEN
            const sum_of_likes = listHelper.totalLikes(test_case.blogs);

            // THEN
            expect(sum_of_likes).toBe(test_case.expected);
        }
    });
});
