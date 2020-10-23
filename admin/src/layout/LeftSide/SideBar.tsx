// import { defineComponent, onMounted, reactive, ref, unref } from 'vue';
// import { HomeOutlined, EditOutlined } from '@ant-design/icons-vue';
// import { useRouter } from 'vue-router';
// import { Menu } from 'ant-design-vue';
// export default defineComponent({
//     name: 'SideBar',
//     props: {},
//     components: {
//         HomeOutlined,
//         EditOutlined
//     },
//     setup(_, { emit }) {
//         const router = useRouter();
//         const selectKeys = ref(['1']);

//         const routerList = router.getRoutes();
//         const dashboard = routerList.filter((item) => {
//             return item.path === '/dashboard';
//         });
//         const menuList = dashboard[0].children;
//         console.log(menuList);

//         const redirect = function (menu: any) {
//             console.log(menu);
//             // router.push(menu.key);
//         };

//         const handleMenuToggle = function () {
//             emit('menuToggle');
//         };

//         return () => {
//             return (
//                 <Menu
//                     theme="dark"
//                     mode="inline"
//                     selectedKeys={unref(selectKeys)}
//                     forceSubMenuRender={true}
//                     onOpenChange={handleMenuToggle}
//                     onClick={redirect}
//                 ></Menu>
//             );
//         };
//     }
// });
