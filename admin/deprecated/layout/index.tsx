import { defineComponent } from 'vue';
import SideBar from './SideBar';
import { Layout } from 'ant-design-vue';
import './index.scss';

export default defineComponent({
    setup() {
        return () => (
            <Layout>
                {() => (
                    <>
                        <Layout.Sider>
                            {() => (
                                <>
                                    <div class="logo"></div>
                                    <SideBar></SideBar>
                                </>
                            )}
                        </Layout.Sider>
                        <Layout>
                            {() => (
                                <>
                                    <Layout.Header style="background: #fff; padding: 0">
                                        {() => <span v-if="collapsed"></span>}
                                    </Layout.Header>
                                    <Layout.Content>{() => 'Content'}</Layout.Content>
                                </>
                            )}
                        </Layout>
                    </>
                )}
            </Layout>
        );
    }
});
