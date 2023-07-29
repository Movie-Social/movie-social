import { isEmpty } from "lodash";
import ProfileListItem from "./ProfileListItem";
interface ProfileListProps {
  data: Record<string, any>[];
}

const ProfileList: React.FC<ProfileListProps> = ({ data }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <main className="w-full flex justify-center">
      <section className="grid grid-cols-3 justify-center items-center content-center grid-col-g md:w-5/6 md:self-center mb-5 py-5 md:border-yellow-300 md:border-2 md:rounded-md max-[767px]:gap-2 md:gap-y-10">
        {data.map((movie) => {
          return <ProfileListItem key={movie.id} movieId={movie.id} />;
        })}
      </section>
    </main>
  );
};
export default ProfileList;
