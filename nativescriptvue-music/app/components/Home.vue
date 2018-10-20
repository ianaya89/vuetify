<template>
	<Page @loaded="onLoaded" class="page">
		<ActionBar class="action-bar" backgroundColor="#3E495C">
            <GridLayout columns="auto, *, auto" rows="60">
                <Image ios:translateY="-5" col="0" row="0" height="30" class="m-l-10 m-r-10" src="https://avatars2.githubusercontent.com/u/32681046?s=400&v=4" />
                <Label col="1" row="0" color="white" textWrap="true" verticalAlignment="center" class="text-center h3 p-l-10 p-r-10" text="NativeScript Vue Spotify" />
                <Image ios:translateY="-5" col="2" row="0" height="30" class="m-l-10 m-r-10" src="https://cdn.icon-icons.com/icons2/844/PNG/512/Spotify_icon-icons.com_67077.png" />
            </GridLayout>
		</ActionBar>
		<GridLayout rows="*, auto, auto" columns="*, auto">
            <ScrollView row="0" col="0" colSpan="2">
				<GridLayout>
					<Label marginTop="250" fontSize="20" v-if="" class="text-muted text-center" textWrap="true" :text="msg" />
					<StackLayout v-if="getItemsMusic.length" class="m-10">
						<template v-for="(r, key, index) in getItemsMusic">
							<GridLayout
                                borderWidth="1" borderBottomWidth="2" 
                                borderTopColor="#eaeaea" borderLeftColor="#dbdbdb"
                                borderRightColor="#dbdbdb" borderBottomColor="#c6c6c6" marginBottom="10"
                                :url="r.external_urls.spotify" @tap="openSpotify" class="p-10" rows="auto, *" columns="150, *">
								<Image borderRadius="5" width="150" height="150" stretch="aspectFill" row="0" rowSpan="2" col="0" :key="`img${index}`" v-if="r.images.length"
								 :src="r.images[0].url" />
								<Image borderRadius="5" width="150" height="150" stretch="aspectFill" row="0" rowSpan="2" col="0" :key="`img${index}`" v-else
								 src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLJIuqakrHpWKNXN6-2mCJsuV7gZUJCEOMmSZ1O4ccDAheG4cl" />
								<StackLayout marginLeft="10" row="0" col="1">
									<Label fontSize="18" textWrap="true" id="lblName" :key="`name${index}`" :text="`Name: ${r.name}`" />
									<Label fontSize="16" textWrap="true" id="lblPopularity" :key="`popularity${index}`" v-if="r.popularity" :text="`Popularity: ${r.popularity}`"
									/>
									<Label fontSize="15" textWrap="true" id="lblMusic" :key="`genres${index}`" v-if="r.genres.length" :text="`Music: ${ r.genres[0] }`"
									/>
								</StackLayout>
							</GridLayout>
						</template>
					</StackLayout>
				</GridLayout>
			</ScrollView>
			<Label row="1" col="0" colSpan="2" class="hr-light" />
			<TextField returnKeyType="search" @returnPress="search" margin="10" paddingLeft="10" borderRadius="10" borderWidth="1"
			 borderColor="lightgray" row="2" col="0" ref="searchBar" hint="Search Artist" v-model="searchPhrase" />
			<Button margin="10" row="2" col="1" class="btn btn-primary" @tap="search">Search</Button>
		</GridLayout>
	</Page>
</template>

<script>
import { mapGetters } from '../vuex';
import * as utils from 'utils/utils';
import * as app from 'application';
import * as platform from 'platform';
import { Color } from 'color';

export default {
    data () {
      return {
        searchPhrase: '',
        msg: 'Search your favourite music on Spotify!'
      }
    },
    computed: mapGetters([
      'getItemsMusic'
    ]),
    methods: {
      onLoaded(args) {
          if (app.android && platform.device.sdkVersion >= '21') {
                const View = android.view.View;

                const window = app.android.foregroundActivity.getWindow();
                window.setStatusBarColor(new Color('#2C333F').android);

                const decorView = window.getDecorView();
                decorView.setSystemUiVisibility(
                    // tslint:disable-next-line:no-bitwise
                    View.SYSTEM_UI_FLAG_LAYOUT_STABLE
                    | View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);
         } else if (app.ios) {
             utils.ios.getter(UIApplication, UIApplication.sharedApplication).statusBarStyle
                    = UIStatusBarStyle.LightContent;
         }
      },
	  searchMusic () {
         const originalMsg = this.msg;
         let i = 0;
         let dotTimer = setInterval(() => {
             this.msg = originalMsg + '.'.repeat((i++ % 4) + 1);
         }, 200);
		 this.$store.dispatch('searchMusic', { data: this.searchPhrase })
            .then(res => {
                clearInterval(dotTimer);
                if (!res.length) {
                    this.msg = "No results found";
                } else {
					this.msg = "";
                }
            }).catch(err => {
                console.log(err);
            });
      },
      search () {
		this.getItemsMusic.length = 0;
        if (this.searchPhrase.trim() !== '') {
            this.msg = 'Searching';
            this.searchMusic({ data: this.searchPhrase.trim() })
        } else {
            this.msg = 'Search for music on Spotify!';
        }
		this.$refs.searchBar.nativeView.dismissSoftInput()
      },
	  openSpotify (args) {
          if (args.object.url) {
			 utils.openUrl(args.object.url);
             args.object.backgroundColor = "#4FDF98";
             setTimeout(() => {
				 args.object.backgroundColor = 'transparent';
             }, 1000);
          }
      }
    }
}

</script>