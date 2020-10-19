<template>
  <div class="list-notes-page">
    <no-ssr>
      <v-row>
        <v-col id="leftListNotes" cols="12" sm="6" md="3" class="left">
          <v-row class="top-sc-left justify-md-space-between">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on" @click="hideMenu()">
                  <v-icon>mdi-menu-left-outline</v-icon>
                </v-btn>
              </template>
              <span>Hide Menu</span>
            </v-tooltip>
            <input
              id="search"
              type="text"
              name=""
              placeholder="Search Notes ..."
              class="inp-srch"
            />
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :loading="loadingNewNote"
                  :disabled="loadingNewNote"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="addNewNote()"
                >
                  <v-icon>mdi-notebook-plus-outline</v-icon>
                </v-btn>
              </template>
              <span>Add New Note</span>
            </v-tooltip>
          </v-row>
          <div class="list-notes-list">
            <v-list two-line>
              <v-list-item-group v-model="selected" active-class="green--text">
                <template v-for="(item, index) in items">
                  <v-list-item :key="index + 'key'" @click="chooseList(item)">
                    <template v-slot:default="{ active }">
                      <v-list-item-content>
                        <v-list-item-title
                          v-text="item.title"
                        ></v-list-item-title>

                        <v-list-item-subtitle
                          v-text="item.notes"
                        ></v-list-item-subtitle>
                      </v-list-item-content>

                      <v-list-item-action>
                        <!-- <v-list-item-action-text
                          v-text="item.action"
                        ></v-list-item-action-text> -->

                        <div
                          :id="'csLoader' + item.id"
                          class="p-cs-loader hide"
                        >
                          <span class="custom-loader">
                            <v-icon light>mdi-cached</v-icon>
                          </span>
                        </div>

                        <v-icon
                          v-if="!active"
                          color="grey lighten-1"
                          style="display: none"
                        >
                          mdi-star-outline
                        </v-icon>

                        <v-icon
                          v-else
                          color="yellow darken-3"
                          style="display: none"
                        >
                          mdi-star
                        </v-icon>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                  <v-divider
                    v-if="index < items.length - 1"
                    :key="index"
                  ></v-divider>
                </template>
              </v-list-item-group>
            </v-list>
          </div>
        </v-col>
        <v-col
          id="rightEditorNote"
          cols="12"
          sm="6"
          md="9"
          class="right offset-md-3"
        >
          <v-row class="top-sc-right justify-md-space-between">
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  id="forShowMenu"
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="showMenu()"
                >
                  <v-icon>mdi-menu-right-outline</v-icon>
                </v-btn>
              </template>
              <span>Show Menu</span>
            </v-tooltip>
            <input
              id="titleNote"
              v-model="listSelected.title"
              type="text"
              name=""
              placeholder="Title Note"
              class="inp-srch"
              @keyup="updateNote()"
            />
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  v-on="on"
                  @click="dialogDeleteData = true"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </template>
              <span>Delete This Note</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-arrow-up-bold-hexagon-outline </v-icon>
                </v-btn>
              </template>
              <span>Publish This Note</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on, attrs }">
                <v-btn icon v-bind="attrs" v-on="on">
                  <v-icon>mdi-information-outline</v-icon>
                </v-btn>
              </template>
              <span>Info</span>
            </v-tooltip>
          </v-row>
          <div class="editor-note-preview">
            <v-row>
              <v-col
                id="leftEditorNotePreview"
                cols="12"
                sm="6"
                md="6"
                class="left"
              >
                <textarea
                  id="editorNoteMarkdown"
                  v-model="listSelected.notes"
                  @keyup="updateNote()"
                ></textarea>
              </v-col>
              <v-col
                id="rightEditorNotePreview"
                cols="12"
                sm="6"
                md="6"
                class="right"
              >
                <div
                  class="result-html overflow-auto"
                  style="
                    height: 100%;
                    max-height: 100%;
                    padding: 5px 10px;
                    border: 1px solid #fff;
                    border-radius: 5px;
                  "
                  v-html="$md.render(listSelected.notes)"
                ></div>
              </v-col>
            </v-row>
          </div>
        </v-col>
      </v-row>

      <v-dialog v-model="dialogDeleteData" persistent max-width="350">
        <v-card>
          <v-card-title class="headline">
            Are you sure want to delete this note?
          </v-card-title>
          <v-card-text>
            <span>
              <b>{{ listSelected.title }}</b> <br />
              {{ listSelected.notes.slice(0, 30) }}
            </span>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
              color="green darken-1"
              outlined
              @click="dialogDeleteData = false"
            >
              Cancel
            </v-btn>
            <v-btn
              :loading="loadingDeleteNote"
              :disabled="loadingDeleteNote"
              color="green darken-1"
              outlined
              @click="fixDeleteNote()"
            >
              Delete
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </no-ssr>
  </div>
</template>

<script>
import $ from 'jquery'
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'ListNotesIndex',
  layout: 'lyt-list-notes',
  components: {},
  async asyncData({ $http, $api }) {
    const listNotes = await $http.$get($api.listNotes())
    const sortedList = listNotes
    const firstVal = sortedList.map((e) => {
      const obj = {
        id: e.id,
        title: e.title,
        titleHead: e.title,
        notes: e.notes,
        notesHead: e.notes,
        publish_status: e.publish_status,
        publish_link: e.publish_link,
        created_at: e.created_at,
        updated_at: e.updated_at,
        deleted_status: e.deleted_status,
        status_change: false,
      }
      return obj
    })
    return {
      items: firstVal,
      listSelected: firstVal[0],
    }
  },
  data() {
    return {
      selected: 0,
      items: [],
      listSelected: {
        title: 'Untitled.',
        notes: '# Hello World!',
      },
      loadingNewNote: false,
      dialogDeleteData: false,
      loadingDeleteNote: false,
      keyupUpdateNote: null,
    }
  },
  mounted() {
    $('.result-html img').css('max-width', '35%')
  },
  methods: {
    hideMenu() {
      $('#leftListNotes').animate({ width: 'toggle' }, 1000)
      $('#rightEditorNote').animate(
        { 'margin-left': '0%', flex: '0 0 100%', 'max-width': '100%' },
        1000
      )
      $('#forShowMenu').show()
    },
    showMenu() {
      $('#leftListNotes').animate({ width: 'toggle' }, 1000)
      $('#rightEditorNote').animate(
        { 'margin-left': '25%', flex: '0 0 75%', 'max-width': '75%' },
        1000
      )
      $('#forShowMenu').hide()
    },
    async addNewNote() {
      this.loadingNewNote = true

      const body = {
        title: 'Untitled.',
        notes: '# This is a New Note.',
        created_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }

      await axios.post(this.$api.addListNotes(), body).then(async (res) => {
        // console.log('result add new notes ', res)
        this.loadingNewNote = false
        await this.getAllNotes()
      })
    },
    async getAllNotes() {
      const http = this.$http
      const listNotes = await http.$get(this.$api.listNotes())
      const sortedList = listNotes
      const firstVal = sortedList.map((e) => {
        const obj = {
          id: e.id,
          title: e.title,
          titleHead: e.title,
          notes: e.notes,
          notesHead: e.notes,
          publish_status: e.publish_status,
          publish_link: e.publish_link,
          created_at: e.created_at,
          updated_at: e.updated_at,
          deleted_status: e.deleted_status,
          status_change: false,
        }
        return obj
      })
      this.items = firstVal
      this.listSelected = firstVal[0]
    },
    async fixDeleteNote() {
      this.loadingDeleteNote = true

      const body = {
        id: this.listSelected.id,
      }

      await axios.post(this.$api.deleteListNotes(), body).then(async (res) => {
        // console.log('fix delete note ', res)
        this.loadingDeleteNote = false
        this.dialogDeleteData = false
        await this.getAllNotes()
      })
    },
    chooseList(item) {
      this.listSelected = item
    },
    updateNote() {
      if (this.keyupUpdateNote != null) {
        clearTimeout(this.keyupUpdateNote)
      }
      $('#csLoader' + this.listSelected.id).show()
      this.keyupUpdateNote = setTimeout(() => {
        this.keyupUpdateNote = null
        this.fixUpdateNote()
      }, 3500)
    },
    fixUpdateNote() {
      const body = {
        id: this.listSelected.id,
        title: this.listSelected.title,
        notes: this.listSelected.notes,
        updated_at: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      }

      axios.post(this.$api.updateListNotes(), body).then((res) => {
        // console.log('fix update note ', res)
        $('#csLoader' + this.listSelected.id).hide()
      })
    },
  },
}
</script>

<style lang="scss" scoped>
#forShowMenu {
  display: none;
}
.custom-loader {
  animation: loader 1s infinite;
  display: flex;
}
@-moz-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-webkit-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@-o-keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@keyframes loader {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
@mixin scroll-bar-white {
  &::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: transparent;
    border-radius: 20px;
  }
  &:hover {
    transition: 1s;
    &::-webkit-scrollbar-thumb {
      background-color: #ffffff;
      border-radius: 20px;
    }
  }
}
.list-notes-page {
  padding: 0 12px;
  height: 100%;
  > .row {
    height: 100%;
    > .left {
      border-right: 1px solid #cccccc;
      height: 100%;
      position: absolute;
      > .top-sc-left {
        border-bottom: 1px solid #cccccc;
        margin: -12px -12px 0 -12px;
        padding: 7px;
        flex-wrap: nowrap;
        > .inp-srch {
          color: #cccccc;
          padding: 3px 7px;
          margin: 0 5px;
          width: 100%;
        }
      }
      > .list-notes-list {
        margin: 0 -12px;
        overflow: auto;
        height: calc(100% - 27px);
        @include scroll-bar-white;
        > .v-list {
          height: 100%;
          padding: 0%;
        }
      }
    }
    > .right {
      height: 100%;
      position: absolute;
      > .top-sc-right {
        margin: -12px -12px 0 -12px;
        padding: 7px;
        flex-wrap: nowrap;
        > .inp-srch {
          color: #cccccc;
          padding: 3px 7px;
          margin: 0 5px;
          width: 100%;
        }
      }
      > .editor-note-preview {
        margin: 0 -12px;
        overflow: auto;
        height: calc(100% - 27px);
        padding: 0px 12px;
        @include scroll-bar-white;
        > .row {
          height: 100%;
          > .left {
            height: 100%;
            padding: 5px 5px 10px 5px;
            #editorNoteMarkdown {
              color: #cccccc;
              padding: 3px 7px;
              margin: 0 5px;
              width: 100%;
              height: 100%;
              @include scroll-bar-white;
            }
          }
          > .right {
            height: 100%;
            padding: 3px 5px 8px 5px;
            > .result-html {
              @include scroll-bar-white;
              img {
                max-width: 35%;
              }
            }
          }
        }
      }
    }
  }
}
</style>
