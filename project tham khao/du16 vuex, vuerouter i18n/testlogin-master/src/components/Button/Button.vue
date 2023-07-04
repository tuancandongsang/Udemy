<template>
    <button :class="nodataCSS">{{ content }}</button>
</template>
<script>
export default {
    props: {
        content: {
            type: String,
            required: true,
            default: "Submit"
        },
        nodataCSS: {
            type: String,
            required: true,
            default: ""
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/styles/index.scss';
button {
    @include btn($btn-default, $btn-text,)
}
.button-disabled {
    background-color: $btn-error;

    &:hover {
        opacity: 0.5;
    }
}
</style>