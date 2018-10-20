import spotify from '../../services/spotify'

const state = {
    itemsMusic: []
};

const mutations = {
    searchmusic(state, items) {
        state.itemsMusic = items
    }
};

const actions = {
    searchMusic: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            const query = payload.data
            spotify.search(query, 'artist')
                .then(res => {
                    commit('searchmusic', res.artists.items)
                    resolve(res.artists.items);
                })
                .catch(err => {
                    reject('error searching music');
                })
        })
    }
};
const getters = {
    getItemsMusic: (state) => {
        return state.itemsMusic
    }
}

export default {
    state,
    mutations,
    actions,
    getters
};
