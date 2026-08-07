// Copyright (c) 2025 WSO2 LLC. (https://www.wso2.com).
//
// WSO2 LLC. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.
import React from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Skeleton } from "./Skeleton";

const ListItemSkeleton = () => {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View style={[styles.container, { width: screenWidth - 24 }]}>
      <Skeleton width={66} height={66} borderRadius={12} />
      <View style={styles.infoContainer}>
        <Skeleton width="70%" height={16} style={{ marginBottom: 8 }} />
        <Skeleton width="90%" height={12} style={{ marginBottom: 8 }} />
        <Skeleton width="30%" height={10} />
      </View>
      <Skeleton width={70} height={32} borderRadius={8} />
    </View>
  );
};

export const ListItemSkeletonList = ({ count = 6 }: { count?: number }) => (
  <>
    {Array.from({ length: count }).map((_, index) => (
      <ListItemSkeleton key={index} />
    ))}
  </>
);

export default ListItemSkeleton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 12,
    marginTop: 16,
    marginBottom: 16,
    alignItems: "center",
    justifyContent: "space-between",
  },
  infoContainer: {
    marginLeft: 16,
    justifyContent: "center",
    flex: 1,
  },
});
