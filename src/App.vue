<template>
    <div id='app'>
        <div id='logo'>
            <img src='@/assets/logo.png'>
        </div>
        <router-view/>
    </div>
</template>

<script>

</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
        line-height: 1.4em;
    }

    #logo {
        width: 100%;
        margin: 10px;
    }

    #logo img {
        width: 50px;
    }

    .view {
        float: left;
        font-size: 16px;
        width: 10%;
        min-width: 150px;
        border-radius: 4px;
        margin: 10px 5px 10px 10px;
        background-color: #fff;
        box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.3);
    }

    .view #title {
        background-color: #494949;
        color: beige;
        text-align: left;
    }

    .view ul {
        padding: 0;
        margin: 0;
    }

    .view li {
        text-align: left;
        list-style: none;
        display: block;
        cursor: pointer;
        min-height: 3rem;
        line-height: 3rem;
        padding: 0 1rem;
        background-color: #fff;
        border-bottom: 1px solid #ddd;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    #title {
        font-weight: bold;
    }
</style>
