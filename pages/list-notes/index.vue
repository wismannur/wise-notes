<template>
  <div class="list-notes-page">
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
              <v-btn icon v-bind="attrs" v-on="on">
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
                <v-list-item :key="index">
                  <template v-slot:default="{ active }">
                    <v-list-item-content>
                      <v-list-item-title
                        v-text="item.title"
                      ></v-list-item-title>

                      <v-list-item-subtitle
                        v-text="item.subtitle"
                      ></v-list-item-subtitle>
                    </v-list-item-content>

                    <v-list-item-action>
                      <v-list-item-action-text
                        v-text="item.action"
                      ></v-list-item-action-text>

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
            type="text"
            name=""
            placeholder="Title Note"
            class="inp-srch"
          />
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon v-bind="attrs" v-on="on">
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
          <no-ssr>
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
                  v-model="valMarkdown"
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
                    padding: 5px;
                    border: 1px solid #fff;
                    border-radius: 5px;
                  "
                  v-html="$md.render(valMarkdown)"
                ></div>
              </v-col>
            </v-row>
          </no-ssr>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: '',
  layout: 'lyt-list-notes',
  components: {},
  data() {
    return {
      valMarkdown: '# Hello World!',
      selected: 0,
      items: [
        {
          action: '15 min',
          headline: 'Brunch this weekend?',
          subtitle:
            "I'll be in your neighborhood doing errands this weekend. Do you want to hang out?",
          title: 'Ali Connors',
        },
        {
          action: '2 hr',
          headline: 'Summer BBQ',
          subtitle: "Wish I could come, but I'm out of town this weekend.",
          title: 'me, Scrott, Jennifer',
        },
        {
          action: '6 hr',
          headline: 'Oui oui',
          subtitle: 'Do you have Paris recommendations? Have you ever been?',
          title: 'Sandra Adams',
        },
        {
          action: '12 hr',
          headline: 'Birthday gift',
          subtitle:
            'Have any ideas about what we should get Heidi for her birthday?',
          title: 'Trevor Hansen',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
        {
          action: '18hr',
          headline: 'Recipe to try',
          subtitle:
            'We should eat this: Grate, Squash, Corn, and tomatillo Tacos.',
          title: 'Britta Holt',
        },
      ],
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
  },
}
</script>

<style lang="scss" scoped>
#forShowMenu {
  display: none;
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
