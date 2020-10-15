import { defineComponent } from 'vue';
import { Layout, Menu } from 'ant-design-vue';

export default defineComponent({
    setup() {
        // const menu = () => {
        //     const slots = {
        //         default: () => (
        //             <>
        //                 <div>123</div>
        //                 <Menu theme="dark" mode="inline">
        //                     {() => (
        //                         <>
        //                             <Menu.Item key="1">{() => <span>Option 1</span>}</Menu.Item>
        //                             <Menu.Item key="2">{() => <span>Option 2</span>}</Menu.Item>
        //                         </>
        //                     )}
        //                 </Menu>
        //             </>
        //         )
        //     };
        //     return <Menu>{slots}</Menu>;
        // };
        // return () => <Layout.Sider>{menu}</Layout.Sider>;
        return () => (
            <Layout.Sider>
                {() => (
                    <>
                        <div>123</div>
                        <Menu theme="dark" mode="inline">
                            {() => (
                                <>
                                    <Menu.Item key="1">{() => <span>Option 1</span>}</Menu.Item>
                                    <Menu.Item key="2">{() => <span>Option 2</span>}</Menu.Item>
                                </>
                            )}
                        </Menu>
                    </>
                )}
            </Layout.Sider>
        );
    }
});
