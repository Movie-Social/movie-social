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
      <section className="grid grid-cols-3 md:w-5/6 md:self-center my-5 px-2 py-5 border-white border-opacity-70 border rounded-md max-[767px]:gap-2 md:gap-y-10">
        {data.map((movie) => {
          return <ProfileListItem key={movie.id} movieId={movie.id} />;
        })}
      </section>
    </main>
  );
};
export default ProfileList;
