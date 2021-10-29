import db from './dbConnection'

class Collection {

    constructor(name) {
        this.name = name
    }

    reformat(doc) {
        // console.log("doc", doc)
        return { id: doc.id, ...doc.data() }
    }

    async getAll() {
        let snapshot = await db.collection(this.name).get()
        return snapshot.docs.map(this.reformat)
    }

    async getOne(id) {
        return this.reformat(await db.collection(this.name).doc(id).get())
    }

    async listenOne(id, set) {
        return id === ""
            ?
            set(null)
            :
            db.collection(this.name).doc(id).onSnapshot(snap => set(this.reformat(snap)))
    }

    async addOne(doc) {
        return await db.collection(this.name).add(doc)
    }

    async removeOne(id) {
        return await db.collection(this.name).doc(id).delete()
    }

    async setOne(id, data) {
        return await db.collection(this.name).doc(id).set(data, { merge: true })
    }

}

class CartCollection extends Collection {

    async getLastUserCart(userid) {
        return (await db.collection(this.name)
            .where('userid', '==', userid)
            .orderBy('opened', 'desc')
            .limit(1)
            .get()
        ).docs.map(this.reformat)[0]
    }

    async payCart(cartId) {
        return await db.collection(this.name).doc(cartId).set({ closed: new Date() }, { merge: true })
    }

    async getPaidCartsByUser(userid) {
        return (await db.collection(this.name)
        .where('closed', '>', new Date(0))
        .where('userid', '==', userid).get()).docs.map(this.reformat)
    }

}

class CartItemsCollection extends Collection {

    async addCartItem(cartId, itemId) {
        let cartItem = await db.collection(this.name)
            .where('productid', '==', itemId)
            .where('cartid', '==', cartId)
            .get()

        if (!cartItem.empty) {
            let cartItemData = cartItem.docs[0].data()
            cartItem.docs[0].ref.set({ count: cartItemData.count + 1 }, { merge: true })
        } else
            await db.collection(this.name).add({ cartid: cartId, productid: itemId, count: 1 })
    }

    async listenCartItemsByCart(cartId, set) {
        return db.collection(this.name).where('cartid', '==', cartId).onSnapshot(snap => set(snap.docs.map(this.reformat)))
    }

    async getCartItemsByCart(cartId) {
        return (await db.collection(this.name).where('cartid', '==', cartId).get()).docs.map(doc => this.reformat(doc))
    }
}

const collections = {
    Products: new Collection('products'),
    Users: new Collection('users'),
    Carts: new CartCollection('carts'),
    CartItems: new CartItemsCollection('cartitems')
}

export default collections