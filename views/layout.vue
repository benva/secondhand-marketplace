<template>
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
            <script src="https://unpkg.com/vue/dist/vue.js"></script>
            <link href="/stylesheets/style.css" rel="stylesheet" type="text/css"></link>
        </head>
        <body>
            {{{app}}}
            {{{script}}}
        </body>
    </html>
</template>

<script>
export default {
    data: function() {
        return {
          user: false
        }
    }
}
</script>

<style lang="css">

</style>
