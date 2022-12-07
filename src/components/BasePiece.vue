<script>
export default {
    data() {
        return {

        }
    },
    props: {
        piece: {
            type: Object,
            required: true,
        },
    },
    computed: {
        pieceClasses() {
            return {
                'blue-piece': this.piece.type === 'B',
                'red-piece': this.piece.type === 'R',
                'small-piece': this.piece.value === 1,
                'medium-piece': this.piece.value === 2,
                'big-piece': this.piece.value === 3,
            }
        }
    }
}
</script>

<template>
    <div class="piece" :class="pieceClasses"></div>
</template>

<style scoped>
.piece {
    position: relative;
}

.blue-piece.small-piece:before,
.blue-piece.medium-piece:before,
.blue-piece.big-piece:before,
.blue-piece.small-piece:after,
.blue-piece.medium-piece:after,
.blue-piece.big-piece:after {
    background-color: #061735;
}

.red-piece.small-piece:before,
.red-piece.medium-piece:before,
.red-piece.big-piece:before,
.red-piece.small-piece:after,
.red-piece.medium-piece:after,
.red-piece.big-piece:after {
    border-color: #AE0000;
    background-color: rgba(0, 0, 0, 0);
}

.small-piece,
.medium-piece,
.big-piece {
    width: 60%;
    height: 60%;
}

.blue-piece.small-piece:before,
.blue-piece.small-piece:after {
    height: 33%;
    width: 8%;
    border-radius: 2px;
}

.blue-piece.medium-piece:before,
.blue-piece.medium-piece:after {
    height: 66%;
    width: 16%;
    border-radius: 5px;
}

.blue-piece.big-piece:before,
.blue-piece.big-piece:after {
    height: 99%;
    width: 32%;
    border-radius: 10px;
}

.blue-piece.small-piece:before,
.blue-piece.medium-piece:before,
.blue-piece.big-piece:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(45deg) translate(-50%, -50%);
    transform-origin: top left;
}

.blue-piece.small-piece:after,
.blue-piece.medium-piece:after,
.blue-piece.big-piece:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(-45deg) translate(-50%, -50%);
    transform-origin: top left;
}

.red-piece.small-piece:before {
    height: 33%;
    width: 33%;
    border-width: 4px;
}

.red-piece.medium-piece:before {
    height: calc(70% - 12px);
    width: calc(70% - 12px);
    border-width: 6px;
}

.red-piece.big-piece:before {
    height: calc(99% - 20px);
    width: calc(99% - 20px);
    border-width: 10px;
}

.red-piece.small-piece:before,
.red-piece.medium-piece:before,
.red-piece.big-piece:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border-style: solid;
}
</style>