import { createRouter, createWebHistory } from "vue-router";



const router = createRouter({
    history: createWebHistory(),
    routes : [
        { path: "/", component: () => import("~/pages/LoginPage.vue") },
        { path: "/displayPage", component: () => import("~/pages/DisplayPage.vue") },
        { path: "/adminPage", component:() => import("~/pages/AdminPage.vue")},
        { path: "/forgotPassword", component:() => import("~/pages/ForgotPassword.vue")},
        { path: "/newPassword", component:() => import("~/pages/CreateNewPage.vue")},
        { path: "/cashierPage", component:() => import("~/pages/CashierPageTransactionTab.vue")},
        { path: "/mobile1", component:() => import("~/pages/Mobile1.vue")},
        { path: "/mobile2", component:() => import("~/pages/Mobile2.vue")},
        { path: "/mobile3", component:() => import("~/pages/Mobile3.vue")},
        { path: "/testing", component:() => import("~/pages/testing.vue")},
        { path: "/testing2", component:() => import("~/pages/testing2.vue")},
        { path: "/invoice", component:() => import("~/pages/InvoiceTest.vue")},
        { path: "/receipt", component:() => import("~/pages/ReceiptTest.vue")},
        { path: "/kiosk", component:() => import("~/pages/Kiosk.vue")},
        { path: "/token", component:() => import("~/pages/Token.vue")},
    ]
});

export default router;