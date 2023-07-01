import { isEmpty } from "lodash";
import ProfileListItem from "./ProfileListItem";
interface ProfileListProps {
  data: Record<string, any>[];
  title: string;
}

const ProfileList: React.FC<ProfileListProps> = ({ data, title }) => {
  if (isEmpty(data)) {
    return null;
  }
  return (
    <main>
      <div className="flex flex-row justify-between">
        <h2 className="border-l-2 border-yellow-500 mx-2 px-2 text-1xl lg:text-2xl font-bold">
          {title}
        </h2>
        <h2 className="text-yellow-400 cursor-pointer text-l lg:text-xl font-light">
          View All
        </h2>
      </div>
      <div className="relative flex justify-around border-blue border-2 my-3">
        {data.map((movie) => {
          return <ProfileListItem key={movie.id} movieId={movie.id} />;
        })}
      </div>
    </main>
  );
};
export default ProfileList;
