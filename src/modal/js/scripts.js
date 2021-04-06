let resizeObserver = null;
const CLASS_LIST = {
    MODAL: 'modal',
    MODAL_ACTIVE: 'modal--active',
    MODAL_HAS_SCROLL: 'modal--has-scroll',
    MODAL_DIALOG_BODY: 'modal__dialog-body',
    TRIGGER_OPEN: 'js-modal-open',
    TRIGGER_CLOSE: 'js-modal-close',
};

const hideScroll = () => {
    document.body.style.paddingRight = `${getScrollbarWidth()}px`;
    document.body.style.overflow = 'hidden';
};

const showScroll = (event) => {
    if (event.propertyName === 'transform') {
        document.body.style.paddingRight = '';
        document.body.style.overflow = 'visible';

        event.target.closest(`.${CLASS_LIST.MODAL}`).removeEventListener('transitionend', showScroll);
    }
};

document.addEventListener('click', (event) => {
    if (event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`)) {
        event.preventDefault();

        const target = event.target.closest(`.${CLASS_LIST.TRIGGER_OPEN}`);
        const modalId = target.getAttribute('href').replace('#', '');
        const modal = document.getElementById(modalId);

        hideScroll();

        modal.classList.add(CLASS_LIST.MODAL_ACTIVE);

        bindResizeObserver(modal);
    }

    if (
        event.target.closest(`.${CLASS_LIST.TRIGGER_CLOSE}`) ||
        event.target.classList.contains(CLASS_LIST.MODAL_ACTIVE)
    ) {
        event.preventDefault();

        const modal = event.target.closest(`.${CLASS_LIST.MODAL}`);

        modal.classList.remove(CLASS_LIST.MODAL_ACTIVE);
        unbindResizeObserver(modal);
        modal.addEventListener('transitionend', showScroll);
    }
});

// Bind observer
function bindResizeObserver (modal) {
    const content = modal.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY}`);

    const toggleShadows = () => {
        modal.classList.toggle(
            CLASS_LIST.MODAL_HAS_SCROLL,
            content.scrollHeight > content.clientHeight,
        );
    };

    resizeObserver = new ResizeObserver(toggleShadows);

    resizeObserver.observe(content);
};

// Unbind observer
const unbindResizeObserver = (modal) => {
    const content = modal.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY}`);

    resizeObserver.unobserve(content);

    resizeObserver = null;
};

// Get scrollbar width
const getScrollbarWidth = () => {
    const outer = document.createElement('div');

    outer.style.position = 'absolute';
    outer.style.top = '-9999px';
    outer.style.width = '50px';
    outer.style.height = '50px';
    outer.style.overflow = 'scroll';
    outer.style.visibility = 'hidden';

    document.body.appendChild(outer);
    const scrollBarWidth = outer.offsetWidth - outer.clientWidth;
    document.body.removeChild(outer);
  
    return scrollBarWidth;
}

// Add temp content
document.getElementById('add-content').addEventListener('click', () => {
    const div = document.createElement('div');
    div.textContent = 'text content';
    div.style.height = '1000px';

    document.querySelector(`.${CLASS_LIST.MODAL_DIALOG_BODY} div`).appendChild(div);
});
