type ProfileLayoutProps = {
  ProfileLeftComponent: React.ReactNode;
  ProfileTopComponent: React.ReactNode;
  ProfileBottomComponent: React.ReactNode;
};

export const ProfileLayout = ({
  ProfileLeftComponent,
  ProfileTopComponent,
  ProfileBottomComponent,
}: ProfileLayoutProps) => {
  return (
    <div className="bg-yellow-50 border-4 border-gray-700 min-h-[18.5rem]">
      <div className="bg-yellow-200 relative border-b-[3px] border-gray-700">
        {ProfileLeftComponent}
        <div className="pl-[11rem] sm:pl-[15rem] pt-6 pb-4 pr-6">{ProfileTopComponent}</div>
      </div>
      <div className="pl-[11rem] sm:pl-[15rem] py-4 pr-6 bg-yellow-50 h-full">
        {ProfileBottomComponent}
      </div>
    </div>
  );
};
