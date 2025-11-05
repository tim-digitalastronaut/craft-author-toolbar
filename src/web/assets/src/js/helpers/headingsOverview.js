export const getHeadingsOverview = () => {
    const elements = document.body.querySelectorAll(`
        h1:not(#cat-toolbar *),
        h2:not(#cat-toolbar *),
        h3:not(#cat-toolbar *),
        h4:not(#cat-toolbar *),
        h5:not(#cat-toolbar *),
        h6:not(#cat-toolbar *)
    `);

    const rawHeadings = Array.from(elements).map((heading) => {
        const level = parseInt(heading.tagName.substring(1), 10);
        return {
            element: heading,
            tag: heading.tagName.toLowerCase(),
            text: heading.textContent.trim(),
            level: level,
            missing: false,
        };
    });

    const filledHeadings = [];
    let lastLevel = 0;

    if (rawHeadings.length === 0) {
        filledHeadings.push({
            element: null,
            tag: "h1",
            text: "Missing heading 1",
            level: 1,
            missing: true,
        });
    }

    rawHeadings.forEach((heading, index) => {
        if (index === 0 && heading.level > 1) {
            for (let level = 1; level < heading.level; level++) {
                filledHeadings.push({
                    element: null,
                    tag: `h${level}`,
                    text: `Missing heading ${level}`,
                    level: level,
                    missing: true,
                });
            }
        }

        if (lastLevel > 0 && heading.level > lastLevel + 1) {
            for (let level = lastLevel + 1; level < heading.level; level++) {
                filledHeadings.push({
                    element: null,
                    tag: `h${level}`,
                    text: `Missing heading ${level}`,
                    level: level,
                    missing: true,
                });
            }
        }

        filledHeadings.push(heading);
        lastLevel = heading.level;
    });

    const results = filledHeadings.map((heading) => ({
        ...heading,
        level: heading.level - 1,
    }));

    return { results };
}