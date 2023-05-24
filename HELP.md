### 쿼리에서 날짜변환 필요할 때
DATE_FORMAT(created_datetime, '%Y-%m-%d %H:%i')

H 대신 h로하면 12시간 표기!

### mybatis 참고
<!-- <![CDATA[>=]]> -->
<foreach collection="adgroupIds" item="item" index="i" open="(" separator="," close=")">
     #{item}
</foreach>
<if test="excludeKeywordIds != null and excludeKeywordIds.size() != 0">
</if>
<choose>
     <when test="adgroupIds != null and adgroupIds.size() != 0">
     </when>
     <otherwise>
     </otherwise>
</choose>
DATE_ADD(now(), INTERVAL -7 DAY)


### 
아래 메세지를 발견한 사람은 못 본척 하십시오..

https://r2bxv4n4vu22lenmzvm75w5eyu0aecvb.lambda-url.ap-northeast-2.on.aws/

Content-Type , application/json
