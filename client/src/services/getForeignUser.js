const getForeignUser = async (userId) => {
  try {
    const response = await fetch(`/api/v1/users/${userId}`);
    if (!response.ok) {
      const errorMessage = `${response.status} (${response.statusText})`;
      const error = new Error(errorMessage);
      throw error;
    }
    const body = await response.json();

    return body.user;
  } catch (error) {
    console.error(`Error in fetch: ${error.message}`);
  }
};

export default getForeignUser;
