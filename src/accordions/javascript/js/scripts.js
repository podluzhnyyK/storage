document.querySelectorAll(".accordion__item-trigger").forEach((item) =>
    item.addEventListener("click", () => {
        const { parentNode } = item;

        if (parentNode.classList.contains("accordion__item--active")) {
            parentNode.classList.remove("accordion__item--active");
        } else {
            document
                .querySelectorAll(".accordion__item")
                .forEach((child) => child.classList.remove("accordion__item--active"));
            parentNode.classList.add("accordion__item--active");
        }

        // parentNode.classList.toggle("accordion__item--active");
    })
);
