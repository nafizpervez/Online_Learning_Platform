import RootLayout from '@/components/Layout';
import DashboardLayout from '@/components/DashboardLayout';

const Settings = () => {
  return <div>My settings screen</div>;
};

Settings.getLayout = (page) => (
  <RootLayout>
    <DashboardLayout>{page}</DashboardLayout>
  </RootLayout>
);

export default Settings;
