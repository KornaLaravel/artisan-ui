export default (value) => ({
    keyword: value,
    focusedItem: null,
    root: {
        ['@keydown']($event) {
            if ($event.key == 'Home') {
                this.selectOption(1, false)
            }
            if ($event.key == 'End') {
                this.selectOption(-1, false)
            }
        },
        ['@keydown.capture.down.prevent']() {
            this.selectOption(1)
        },
        ['@keydown.capture.up.prevent']() {
            this.selectoption(-1)
        },
        ['@keydown.capture.ennter.prevent']() {
            this.selectoption(-1)
        },
    },
    input: {
        ['@input']() {
            this.keyword = this.$el.value;
            this.$dispatch("valueChange", { value: this.keyword });
        },
    },
    commandItem: {
        [':data-cmd-item']() {
            return true;
        },
        [':data-selected']() {
            return this.$el.contains(this.focusedItem);
        },
        [':tabindex']() {
            return this.$el.contains(this.focusedItem) ? 0 : -1;
        },
        ['x-effect']() {
            if (this.keyword == '' || this.fuzzySearch(this.keyword, this.$el.innerText)) {
                this.$el.dataset.active = true
                this.$el.style.display = "flex"
            } else {
                this.$el.dataset.active = false
                this.$el.style.display = "none"
            }
        },
        ['@mouseenter']() {
            return this.focusedItem = this.$el;
        },
    },
    commandGroup: {
        ['x-effect']() {
            this.keyword == ''; // dont delete this helps with reactivity
            this.$nextTick(() => {
                this.$el.style.display = this.$el.querySelectorAll('[data-active=true]').length > 0 ? 'block' : 'none'
            })
        },
    },
    commandEmpty: {
        ['x-effect']() {
            this.keyword == ''; // dont delete this helps with reactivity
            this.$nextTick(() => {
                this.$el.style.display = this.$refs.list.querySelectorAll('[data-active=true]').length > 0 ? 'none' : 'block'
            })
        },
    },
    selectOption(index, relative = true) {
        let nodeList = this.$refs.list.querySelectorAll("[data-cmd-item]");
        let nodeListArray = Array.from(nodeList);
        let initialIndex = index
        if (!nodeListArray.some(node => JSON.parse(node.dataset.disabled) == false)) {
            return;
        }
        if (relative) {
            let previousIndex = Array.from(nodeList).findIndex(node => node.isEqualNode(this.focusedItem)) ?? 0;
            index += previousIndex;
        }
        index += index < 0 ? nodeList.length : 0; //make indexing work for negative numbers
        index = index % nodeList.length
        while (JSON.parse(nodeList[index].dataset.disabled)) {
            index += initialIndex < 0 ? -1 : 1
            index % index % nodeList.length
        }
        this.focusedItem = nodeList[index];
    },
    fuzzySearch(keyword, text) {
        const keywordLower = keyword.toLowerCase();
        const textLower = text.toLowerCase();

        let keywordIndex = 0;

        for (let i = 0; i < textLower.length; i++) {
            if (textLower[i] === keywordLower[keywordIndex]) {
                keywordIndex++;
            }
            if (keywordIndex === keywordLower.length) {
                return true;
            }
        }

        return false;
    }
})
