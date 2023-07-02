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
    <main>
      <div className="relative flex justify-around border-blue border-2 my-3">
        {data.map((movie) => {
          return <ProfileListItem key={movie.id} movieId={movie.id} />;
        })}
      </div>
    </main>
  );
};
export default ProfileList;
