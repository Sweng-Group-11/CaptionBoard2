 <template>
  <div>
    <v-expansion-panels accordion>
      <v-expansion-panel
        v-for="(name, nameIndex) in storyboard_names"
        :key="nameIndex"
      >
        <v-expansion-panel-header>
          {{ name }}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <v-card max-width="344">
            <v-img :src="images[nameIndex]" height="200px"></v-img>

            <v-card-actions>
              <div class="blue--text">{{ captions[nameIndex] }}</div>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script>
import firebase from "firebase/compat/app";
import "firebase/compat/storage";
import "firebase/compat/auth";
import "firebase/compat/firestore";
export default {
  methods: {
    async populateCaptions() {
      const captionsRef = firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("captions");

      const numRef = firebase
        .firestore()
        .collection("users")
        .doc("testID")
        .collection("captions")
        .doc("num_captions");

      const admins = [];
      const captions = [];
      const pictures = [];
      const storyboard_names = [];
      const images = [];

      numRef
        .get()
        .then(function (num) {
          const num_captions = num.get("num");
          for (let i = 1; i <= num_captions; i++) {
            let num = i.toString();
            captionsRef
              .doc(num)
              .get()
              .then(function (caption) {
                const admin = caption.get("admin_id");
                admins.push(admin);

                const thisCaption = caption.get("caption");
                captions.push(thisCaption);

                const picture = caption.get("picture");
                pictures.push(picture);

                const sb_name = caption.get("storyboard_name");
                storyboard_names.push(sb_name);

                const imageRef = firebase
                  .firestore()
                  .collection("users")
                  .doc(admin)
                  .collection("storyboard1")
                  .doc(sb_name)
                  .collection("images")
                  .doc(picture.toString());

                imageRef.get().then(function (img) {
                  images.push(img.get("url"));
                });
              });
          }
        })
        .then(() => {
          this.admins = admins;
          this.captions = captions;
          this.pictures = pictures;
          this.storyboard_names = storyboard_names;
          this.images = images;
        });
    },
  },

  beforeMount() {
    this.populateCaptions().then(() => {
      this.getImages();
    });
  },

  data: () => {
    return {
      admins: [],
      captions: [],
      pictures: [],
      storyboard_names: [],
      test: [],
      images: [],
    };
  },
};
</script> 