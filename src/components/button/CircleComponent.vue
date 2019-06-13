<template>
    <span @click.left=mExec class="circle">add_circle_outline</span>
</template>

<script>
    export default {
        name: "CircleComponent",
        props: ["mExec"]

    }
</script>

<style scoped>
    .circle {
        font-family: 'Material Icons';
        font-size: 2.25em;
        color: rgba(114, 111, 112, 0.5);
        line-height: 2.25em;
        cursor: pointer;
    }

    .circle:hover {
        color: black;
    }
</style>
