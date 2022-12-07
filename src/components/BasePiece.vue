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
    <span class="piece" :class="pieceClasses"></span>
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
    background-color: #AE0000;
}

.small-piece,
.medium-piece,
.big-piece {
    width: 60%;
    height: 60%;
}

.small-piece:before,
.small-piece:after {
    height: 33%;
    width: 8%;
    border-radius: 2px;
}

.medium-piece:before,
.medium-piece:after {
    height: 66%;
    width: 16%;
    border-radius: 5px;
}

.big-piece:before,
.big-piece:after {
    height: 99%;
    width: 32%;
    border-radius: 10px;
}

.small-piece:before,
.medium-piece:before,
.big-piece:before {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(45deg) translate(-50%, -50%);
    transform-origin: top left;
}

.small-piece:after,
.medium-piece:after,
.big-piece:after {
    content: '';
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: rotate(-45deg) translate(-50%, -50%);
    transform-origin: top left;
}
</style>