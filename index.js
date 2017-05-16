var app = new Vue({
    el: '#el',
    data: {
        lists: [
            {id: 0, title: '便签1', content: '内容1', top: 10, left: 10, theme: 'red'},
        ],
        moveEvent: {state: false, index: null, position: {}}
    },
    methods: {
        md: function (i, e) {
            this.moveEvent.state = true;
            this.moveEvent.index = i;
            this.moveEvent.position = {
                y: e.offsetY, x: e.offsetX
            }
        },
        mv: function (e) {
            if (this.moveEvent.state) {
                var top = e.clientY - 44 - this.moveEvent.position.y,
                    left = e.clientX - this.moveEvent.position.x;
                //     width=document.documentElement.clientWidth,
                //     height=document.documentElement.clientHeight;
                // if(top<0){
                //     top=0
                // }
                // if(left<0){
                //     left=0
                // }
                // if(top>height-e.offsetHeight){
                //     top=height-e.offsetHeight
                // }
                // if(left>width-e.offsetWidth){
                //     left=width-e.offsetHeight
                // }
                // console.log(width,height)
                this.lists[this.moveEvent.index].top = top;
                this.lists[this.moveEvent.index].left = left;
                this.save();
            }
        },
        mu: function () {
            this.moveEvent.state = false;
        },
        save: function () {
            localStorage.lists = JSON.stringify(this.lists);
        },
        deleteNote:function (i) {
            this.lists.splice(i,1)
            this.save()
        },
        addNote: function (e) {
            var top = e.clientY - 70,
                left = e.clientX - 100,
                id = this.lists.length?(this.lists[this.lists.length - 1].id + 1):1,
                colors = ['red', 'blue', 'orange', 'yellow'];
            item = {
                id: id,
                title: '便签' + id,
                content: '内容' + id,
                top: top,
                left: left,
                theme: colors[Math.floor(Math.random() * colors.length)]
            };
            this.lists.push(item);
            this.save();
        }
    },
    mounted: function () {
        document.onkeyup=function (e) {
            if(e.keyCode==46){
                this.lists.splice(this.moveEvent.index,1)
                this.save()
            }

        }.bind(this)
        if (localStorage.lists) {
            this.lists = JSON.parse(localStorage.lists)
        }
    }
});